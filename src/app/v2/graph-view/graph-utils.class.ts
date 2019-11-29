export class GraphUtils {

  static startTime = new Date();

  static timeLog(...args: string[]) {
    let currentDate = new Date();
    let elapsed = Math.floor((currentDate.getTime() - GraphUtils.startTime.getTime()) / 1000);
    console.log(elapsed + " sec", args);
  }
}