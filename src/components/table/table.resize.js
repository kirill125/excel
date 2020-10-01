import { $ } from "@core/dom";

export function resizeHandler($root, event) {
    return new Promise((resolve) => {
        const $resizer = $(event.target);
        const $parent = $resizer.closest("[data-type='resizable'");
        const coords = $parent.getCoords();
        const resizeEl = $parent.data["col"] ? "col" : "row";
        const cellIndex = $parent.data[resizeEl];
        const sideProp = resizeEl === "col" ? "bottom" : "right";
        let value;
        $resizer.css({
            opacity: 1,
            [sideProp]: "-5000px"
        });

        const cells = $root.findAll(`[data-col="${cellIndex}"]`);
        document.onmousemove = e => {
            if (resizeEl === "col") {
                const delta = e.pageX - coords.right;
                // console.log(delta);
                // $parent.$el.style.width = coords.width + delta + "px";
                value = coords.width + delta;
                $resizer.css({ right: -delta + "px" });
                // $parent.css({ width: value });
                // cells.forEach(cell => cell.style.width = $parent.$el.style.width);
            } else {
                const delta = e.clientY - coords.bottom;
                // $parent.$el.style.height = coords.height + delta + "px";
                value = coords.height + delta;
                $resizer.css({ bottom: -delta + "px" });
                // $parent.css({ height: value });
            }

            //     const delta = e.pageX - coords.right;
            //     // console.log(delta);
            //     console.log($resizer.getCoords().x + delta);
            //     console.log($resizer.$el.style.right);
            //     $resizer.$el.style.right = -(delta + "px");
            //     $resizer.$el.style.opacity = 1;
            //     console.log($resizer.$el.style.right);
        };

        document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
            $resizer.$el.removeAttribute("style");
            if (resizeEl === "col") {
                $parent.css({ width: value + "px" });
                cells.forEach(cell => cell.style.width = $parent.$el.style.width);
            } else {
                $parent.css({ height: value + "px" });
            }
            resolve({ [cellIndex]: value, type: resizeEl });
        };
    });
}