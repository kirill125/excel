export default class Emitter {
    constructor() {
        this.observers = {};
    }

    subscribe(event, fn) {
        this.observers[event] = this.observers[event] || [];
        this.observers[event].push(fn);
        return () => {
            this.observers[event] = this.observers[event].filter(obs => obs !== fn);
        };
    }

    // unsubscribe(observer) {
    //     this.observers = this.observers.filter(obs => obs !== observer);
    // }

    emit(event, ...args) {
        if (Array.isArray(this.observers[event])) {
            this.observers[event].forEach(obs => obs(...args));
            return true;
        } else {
            return false;
        }
    }
}