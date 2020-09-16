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

    set text(text) {
        if (typeof text === "string") {
            this.$el.textContent = text;
        }
    }

    get text() {
        return this.$el.textContent;
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
    closest(selector) {
        return $(this.$el.closest(selector));
    }
    get data() {
        return this.$el.dataset;
    }
    getCoords() {
        return this.$el.getBoundingClientRect();
    }

    find(selector) {
        return $(this.$el.querySelector(selector));
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    css(styles = {}) {
        for (const style in styles) {
            if (Object.prototype.hasOwnProperty.call(styles, style)) {
                this.$el.style[style] = styles[style];
            }
        }
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(parse);
            return {
                row: +parsed[0],
                col: +parsed[1]
            };
        }
        return this.data.id;
    }

    focus() {
        this.$el.focus();
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

    addClass(className) {
        this.$el.classList.add(className);
        return this;
    }

    removeClass(className) {
        this.$el.classList.remove(className);
        return this;
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