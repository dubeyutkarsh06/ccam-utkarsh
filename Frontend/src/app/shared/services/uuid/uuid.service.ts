import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UuidService {

    private uuid = null;

    constructor() { }

    public getUuid() {
        return this.uuid;
    }

    public setUuid(uuid: string) {
        this.uuid = uuid;
    }
}
