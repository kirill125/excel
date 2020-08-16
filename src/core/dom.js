class Dom {
    constructor(selector) {
        // if (!selector) {
        //     return {};
        // }
        // if (selector.tagName) {
        //     this[0] = selector;
        //     this.length = 1;
        //     return this;
        // }
        // Object.assign(this, document.querySelectorAll(selector));
        // return this;

        this.$el = typeof selector === "string" ?
            document.querySelector(selector) : selector;
    }

    html(text) {
        if (typeof text === "string") {
            this.$el.innerHTML = text;
            return this;
        } else {
            return this.$el.outerHTML;
        }
    }
    clear() {
        this.html("");
        return this;
    }
    append(element) {
        if (element.$el) {
            this.$el.append(element.$el);
        } else {
            this.$el.append(element);
        }
        // console.log(element.$el instanceof Element);
        // console.log(this.$el instanceof Element);
        return this;
    }

    on(eventType, cb) {
        if (eventType && cb) {
            this.$el.addEventListener(eventType, cb);
        }
    }

    off(eventType, cb) {
        if (eventType && cb) {
            this.$el.removeEventListener(eventType, cb);
        }
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tagname, classes = "") => {
    const el = document.createElement(tagname);
    if (classes) {
        el.classList.add(classes);
    }
    return $(el);
};