export const getAroundItems = (arr, idx) => {
    let row = Math.sqrt(arr.length)

    let indices = {
        left: idx - 1,
        right: idx + 1,
        bottom: idx + row,
        bottomLeft: idx + row - 1,
        bottomRight: idx + row + 1,
        top: idx - row,
        topLeft: idx - row - 1,
        topRight: idx - row + 1
    };

    let isLeftCol = idx % row === 0;
    let isRightCol = (idx + 1) % row === 0;

    if (isLeftCol) {
        delete indices.topLeft;
        delete indices.left;
        delete indices.bottomLeft;
    }

    if (isRightCol) {
        delete indices.topRight;
        delete indices.right;
        delete indices.bottomRight;
    }

    return arr.filter((el, idx) => Object.values(indices).includes(idx))
}