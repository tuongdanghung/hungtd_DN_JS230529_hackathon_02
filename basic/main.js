function ex_1() {
    const number = prompt("Enter a data")
    const newNumber = Array.from(number)
    let symm = true;

    for (let i = 0; i < newNumber.length; i++) {
        if (newNumber[i] != newNumber[newNumber.length - i - 1]) {
            symm = false;
            break;
        }
    }

    if (symm)
        alert('là chuỗi đối xứng')
    else
        alert("không phải là chuỗi đối xứng");
}

// Ex 1

function capitalizeSentence(str) {
    let result = '';
    let capitalizeNextChar = true;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (capitalizeNextChar && /[a-z]/i.test(char)) {
            result += char.toUpperCase();
            capitalizeNextChar = false;
        } else {
            result += char.toLowerCase();
        }
        if (char === '.') {
            capitalizeNextChar = true;
        }
    }

    return result;
}

function ex_2() {
    let string = prompt("Nhập chuỗi");
    let transformedString = capitalizeSentence(string);
    console.log(transformedString);
}
// Ex2


function ex_3() {
    let principal = parseFloat(prompt("Nhập số tiền cần gửi:"));
    let months = parseInt(prompt("Nhập số tháng gửi tiền:"));
    let interestRate = 0.07 / 12;
    let totalAmount = principal * Math.pow(1 + interestRate, months);
    let formattedAmount = totalAmount.toFixed(2);
    alert("Số tiền nhận được sau " + months + " tháng là: " + formattedAmount);
}

// Ex3

function ex_4() {
    function bubbleSort(arr) {
        let len = arr.length;
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - 1 - i; j++) {
                if (arr[j] < arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }

        return arr;
    }
    let Arr = [5, 2, 3, 4, 1];
    let sortedArr = bubbleSort(Arr);

    alert("Mảng sau khi sắp xếp giảm dần: " + sortedArr);

}