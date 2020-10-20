export class Flash {
    constructor(message: string, type: string, keepAfterLocationChange: boolean) {
        this.message = message;
        this.type = type;
        this.keepAfterLocationChange = keepAfterLocationChange;
    }
    message: string;
    type: string;
    keepAfterLocationChange: boolean;
}
