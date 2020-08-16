const CODES = {
    A: 65,
    Z: 90
};

function toColumn(col) {
    return `
        <div class="column">${col}</div>
    `;
}

function toCell(cell) {
    return `
        <div class="cell" contenteditable>${cell}</div>
    `;
}

function createRow(content, index = "") {
    return `<div class="row">
        <div class="row-info">${index}</div>
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
            .map(toCell)
            .join("");
        rows.push(createRow(cells, i+1));
    }

    return rows.join("");
}


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