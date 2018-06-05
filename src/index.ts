export function setQuotationMarks(data: string): string {
    if (data.charCodeAt(0) != 34) {
        data = String.fromCharCode(34) + data;
    }
    if (data.charCodeAt(data.length - 1) != 34) {
        data += String.fromCharCode(34);
    }
    return data;
}

export function clean(arr: any[]): any[] {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === undefined || arr[i] === null || arr[i] === '') {
            arr.splice(i--, 1);
        }
    }
    return arr;
}