import { performance } from 'perf_hooks';
import { createElement } from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { Color } from './server.types';
import { Request, Response } from './server.types';

export const fetchData = (
  req: Request,
  res: Response,
  component: any,
  props?: object | any
) => {
  // measuring req and response time
  const actualStartingTime = performance.now();
  let startingTime: number[] = [];
  const measurePerformance = (msg: string, time: number) => {
    let _str = `${Color.custom.black(`${msg} takes`)} ${Color.custom.red(
      time.toFixed(4) + 'ms'
    )}`;
    console.log(Color.custom.bgGreen(_str));
  };
  startingTime[0] = performance.now();
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  measurePerformance('"Obtaining ip"', performance.now() - startingTime[0]);

  startingTime[1] = performance.now();

  const _createElement = createElement(component, props);

  measurePerformance(
    '"Creating elements"',
    performance.now() - startingTime[1]
  );
  startingTime[2] = performance.now();

  const reactStream = renderToNodeStream(_createElement);

  measurePerformance(
    '"Rendering to nodeStream"',
    performance.now() - startingTime[2]
  );
  startingTime[3] = performance.now();

  reactStream.pipe(res, { end: false });
  reactStream.on('end', () => {
    measurePerformance(
      '"Piping the rest of the elements"',
      performance.now() - startingTime[3]
    );
    startingTime[4] = performance.now();

    res.end();

    let endingTime = performance.now();
    measurePerformance('Ending response', endingTime - startingTime[4]);
    let totalTime = 0;
    for (let i = 0; i < startingTime.length; i++) {
      if (i == 0) continue;
      else if (i === startingTime.length - 1)
        totalTime += endingTime - startingTime[i - 1];
      else {
        totalTime += startingTime[i] - startingTime[i - 1];
      }
    }
    console.log(
      Color.custom.bgGreen(
        `\n${Color.custom.black(
          'Total time taken for responding a single request(separately):'
        )} ${Color.custom.red(totalTime.toFixed(4) + 'ms')}`
      )
    );
    const actualResponseTime = endingTime - actualStartingTime;
    const totalLoss = () => {
      if (actualResponseTime > totalTime) {
        return actualResponseTime - totalTime;
      } else {
        return 0;
      }
    };
    const _loss = totalLoss();
    const percentageOfLoss = (_loss * 100) / actualResponseTime;
    console.log(
      Color.custom.bgGreen(
        `${Color.custom.black(
          'Total time taken for responding a single request(actual):'
        )} ${Color.custom.red(
          actualResponseTime.toFixed(4) + 'ms'
        )} ${Color.custom.black(`and total loss`)} ${Color.custom.red(
          percentageOfLoss.toFixed(4) + '%'
        )}${Color.custom.black('(')}${Color.custom.red(
          _loss.toFixed(4) + 'ms'
        )}${Color.custom.black(') to response at')} ${Color.custom.blue(
          JSON.stringify(ip)
        )}`
      )
    );
  });
};
