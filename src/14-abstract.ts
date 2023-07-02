abstract class Logger {
  prepare() {
    console.log('Logger Prepare');
  }

  abstract execute(message: string): void;

  complete() {
    console.log('Logger Complete');
  }

  log(message: string) {
    this.prepare();
    this.execute(message);
    this.complete();
  }
}

class ConsoleLogger extends Logger {
  execute(message: string): void {
    console.log(message);
  }
}

const consoleLogger = new ConsoleLogger();

consoleLogger.log('Console Logger');
