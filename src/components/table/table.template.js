const CODES = {
    A: 65,
    Z: 90
};

function toColumn(col, index) {
    return `
        <div class="column" data-type="resizable" data-col=${index}>
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

// function toCell(_, index) {
//     return `
//         <div class="cell" contenteditable data-col=${index}></div>
//     `;
// }

function toCell(row) {
    return function(_, index) {
        return `
            <div class="cell" contenteditable data-col="${index}" data-id="${row}:${index}" data-type="cell"></div>
        `;
    };
}

function createRow(content, index = "") {
    const rowResize = index ? "<div class='row-resize' data-resize='row'></div>" : "";
    return `<div class="row" data-type="resizable">
        <div class="row-info">
            ${index}
            ${rowResize}
        </div>
        <div class="row-data">
            ${content}
        </div>
    </div>`;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill("")
        .map(toChar)
        .map(toColumn)
        .join("");

    rows.push(createRow(cols));

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill("")
            // .map((el, index) => toChar(el, index) + (i+1))
            // .map(toCell)
            // .map((_, col) => toCell(i, col))
            .map(toCell(i))
            .join("");
        rows.push(createRow(cells, i+1));
    }

    return rows.join("");
}

// export function resizeCol(index, width) {
//     const rows = document.querySelectorAll(".row-data");
//     rows.forEach(row => {
//         // const currentWidth = window.getComputedStyle(row.children[index]).getPropertyValue("width").replace(/\D/g, "");
//         // console.log(currentWidth);
//         // row.children[index].style.width = +currentWidth + (+width)+"px";
//         row.children[index].style.width = width;
//     });
// }


// export function createTable(rowsCount = 15) {
//     const tableHeader = createTableHeader();
//     const tableRows = createAllRows(rowsCount);
//     return tableHeader + tableRows;
// }

// function createTableHeader() {
//     let template = "";
//     for (let i = CODES.A; i <= CODES.Z; i ++) {
//         template += `<div class="column">${String.fromCharCode(i)}</div>`;
//     }
//     const tableHeader =
//     `<div class="row">
//         <div class="row-info"></div>
//         <div class="row-data">
//             ${template}
//         </div>
//     </div>`;
//     return tableHeader;
// }

// function createRow(rowsCounter) {
//     let templateRow = "";
//     for (let i = CODES.A; i <= CODES.Z; i ++) {
//         templateRow += `<div class="cell" contenteditable>${String.fromCharCode(i) + rowsCounter}</div>`;
//     }
//     return `<div class="row">
//         <div class="row-info">${rowsCounter}</div>
//         <div class="row-data">
//             ${templateRow}
//         </div>
//     </div>`;
// }

// function createAllRows(rowsNumber) {
//     let template = "";
//     for (let i = 1; i <= rowsNumber; i++) {
//         template += createRow(i);
//     }
//     return template;
// }