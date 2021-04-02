export class IndexEvents {
  constructor() {
    console.log("I'm from index events!");
    this.addEvents();
  }

  private addEvents() {
    document
      .getElementsByClassName('container')[0]
      .addEventListener('click', () => {
        console.log('clicking on container!');
      });
  }
}
