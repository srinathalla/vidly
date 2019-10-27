export function paginate(array, currentPage, pageSize) {
    let pageEntries = [];

    const pos = (currentPage - 1) * pageSize;

    

    for (let i = pos; i < pos + pageSize && i < array.length; i++) {
        pageEntries.push(array[i]);
    }

    return pageEntries;
}