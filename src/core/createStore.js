export default class Store {
    constructor(rootReducer, initialState = {}) {
        this.rootReducer = rootReducer;
        this.state = this.rootReducer({ ...initialState }, { type: "__INITIAL__" });
        this.subscribers = [];
    }
    dispatch(action) {
        this.state = this.rootReducer(this.state, action);
        this.subscribers.forEach(sub => sub(this.state));
    }
    subscribe(cb) {
        this.subscribers.push(cb);
        const that = this;
        return {
            unsubscribe() {
                that.subscribers = that.subscribers.filter(sub => sub !== cb);
            }
        };
    }
    getState() {
        return JSON.parse(JSON.stringify(this.state));
    }
}