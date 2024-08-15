import HttpStatus from "http-status-codes";
import { ExtendableError } from "ts-error";

export default class BaseError extends ExtendableError {
    code: number = HttpStatus.INTERNAL_SERVER_ERROR;
    constructor(m: string, code: number, name?: string) {
      super(m);
      Object.setPrototypeOf(this, BaseError.prototype);
      this.code = code;
      this.name = name ? name : this.constructor.name;
    }

    getCode(): number {
      return this.code;
    }
}
