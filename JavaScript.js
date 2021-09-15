

var td_num = 100;
var init_tr_num = 100;
var code_A = 65;
window.onload = function ()
{

    function numToString(number) {
        let char = "";
        let array = [];
        // Switch ASCII

        let numToStringAction = function (nnum) {
            let num = nnum - 1;
            let a = parseInt(num / 26);
            let b = num % 26;
            array.push(b);
            if (a > 0) {
                numToStringAction(a);
            }
        }
        numToStringAction(number);
        array = array.reverse();
        // Return excel letter: such => C / AA / BBA
        for (let i = 0; i < array.length; i++) {
            char += String.fromCharCode(64 + parseInt(array[i] + 1));
        }
        return char;
    }
   
    for (var i = 0; i < td_num; i++) {
        
        var row = document.querySelector("table").insertRow(-1);
        for (var j = 0; j < init_tr_num; j++) {
            var letter = numToString(j);
            row.insertCell(-1).innerHTML = i && j ? "<input id='" + letter + i + "'/>" : i || letter;
        }
    }
    function decompose(cellRef) {
        return {
            col: cellRef.substring(0, 1).charCodeAt(0) - code_A,
            row: cellRef.substring(1) * 1
        };
    }

    var DATA = {}, INPUTS = [].slice.call(document.querySelectorAll("input"));
    DATA.SUM = function (start, end) {
        var sum = 0;
        var s = decompose(start);
        var e = decompose(end);
        for (var y = s.row; y <= e.row; ++y)
            for (var x = s.col; x <= e.col; ++x)
                sum += DATA[String.fromCharCode(code_A + x) + y];
        return sum;
    };

    INPUTS.forEach(function ($) {
        $.onfocus = function (e) {
            e.target.value = localStorage[e.target.id] || "";
        };
        $.onblur = function (e) {
            localStorage[e.target.id] = e.target.value;
            computeAll();
        };
        var getter = function () {
            var value = localStorage[$.id] || "";
            if (value.charAt(0) == "=") {
                with (DATA) return eval(value.substring(1));
            } else { return isNaN(parseFloat(value)) ? value : parseFloat(value); }
        };
        Object.defineProperty(DATA, $.id, { get: getter });
        Object.defineProperty(DATA, $.id.toLowerCase(), { get: getter });
    });
    (window.computeAll = function () {
        INPUTS.forEach(function ($) { try { $.value = DATA[$.id]; } catch (e) { } });
    })();

   
}


