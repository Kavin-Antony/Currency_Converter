function route1(){
        document.getElementById("style").href = "style.css";
        document.getElementById("container").innerHTML = `\
            <button id=\"go-back-btn\"style=\"width:200px; position: fixed; top: 20px; left: 20px; padding: 10px 20px; background-color: #1f2029; color: #ffeba7; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;\">Go Back</button> \
            <div class=\"converter_page\" id=\"converter_page\"> \
                <h1>Currency Convertor</h1> \
                <div class=\"box\"> \
                    <div class=\"left-box\"> \
                        <select name=\"currency\" class=\"currency\"> \
                        </select> \
                        <input type=\"number\" id=\"input\"> \
                    </div> \
                    <div class=\"right-box\"> \
                        <select name=\"currency\" class=\"currency\"> \
                        </select> \
                        <input type=\"number\" id=\"result\">\
                    </div>\
                </div>\
                <div class=\"btn\">\
                    <button id=\"btn\">Convert</button>\
                </div>\
            </div>`;
        async function getCurrencies() {
            try {
                const response = await fetch('https://api.frankfurter.app/currencies');
                const data = await response.json();
                displayDropDown(data);
            } catch (error) {
                console.error("Error fetching currencies:", error);
            }
        }
        document.getElementById("go-back-btn").addEventListener('click', route);
        let select = document.querySelectorAll('.currency');
        let btn = document.getElementById("btn");
        let input = document.getElementById("input");

        function displayDropDown(data) {
            const entries = Object.entries(data);
            for (let i = 0; i < entries.length; i++) {
                let optionHTML = `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
                select[0].innerHTML += optionHTML;
                select[1].innerHTML += optionHTML;
            }
        }

        getCurrencies();

        function convertor(curr1,curr2,inputval){
            const host = 'api.frankfurter.app';
            fetch(`https://${host}/latest?amount=${inputval}&from=${curr1}&to=${curr2}`)
            .then(resp => resp.json())
            .then((data) => {
            document.getElementById('result').value = Object.values(data.rates)[0]
        });
        }

        function convert(){
            let curr1=select[0].value
            let curr2=select[1].value
            let inputval = input.value
            if (curr1 === curr2)
                alert("Choose different currencies");
            else{
                convertor(curr1,curr2,inputval);
            }
        }

        btn.addEventListener('click',convert)
    }

function route2(){
        document.getElementById("style").href = "viewer.css";
        document.getElementById("container").innerHTML = `
            <button id="go-back-btn" style="width:200px; position: fixed; top: 20px; left: 20px; padding: 10px 20px; background-color: #1f2029; color: #ffeba7; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Go Back</button>
            <div class="wrapper">
            <h1>Currency Rate Viewer</h1>
            <label for="currency-select">Select a Currency:</label>
            <select id="currency-select">
                <option value="">Loading...</option>
            </select>

            <h2 id="result-title"></h2>
            <table id="rates-table" style="display: none;">
                <thead>
                <tr>
                    <th>Currency</th>
                    <th>Rate</th>
                    <th>Currency</th>
                    <th>Rate</th>
                    <th>Currency</th>
                    <th>Rate</th>
                </tr>
                </thead>
                <tbody id="rates-body"></tbody>
            </table>
            </div>
        `;
        document.getElementById("go-back-btn").addEventListener('click', route);
        const currencySelect = document.getElementById("currency-select");
        const resultTitle = document.getElementById("result-title");
        const ratesTable = document.getElementById("rates-table");
        const ratesBody = document.getElementById("rates-body");

        async function loadCurrencies() {
            const response = await fetch('https://api.frankfurter.app/currencies');
            const data = await response.json();
            currencySelect.innerHTML = '<option value="">-- Select Currency --</option>';
            for (let code in data) {
            const option = document.createElement("option");
            option.value = code;
            option.textContent = `${code} - ${data[code]}`;
            currencySelect.appendChild(option);
            }
        }

        currencySelect.addEventListener("change", async () => {
            const selected = currencySelect.value;
            if (!selected) return;

            const response = await fetch(`https://api.frankfurter.app/latest?from=${selected}`);
            const data = await response.json();

            resultTitle.textContent = `1 ${selected} equals to:`;

            const entries = Object.entries(data.rates);
            const third = Math.ceil(entries.length / 3);
            const col1 = entries.slice(0, third);
            const col2 = entries.slice(third, 2 * third);
            const col3 = entries.slice(2 * third);

            let rows = "";

            for (let i = 0; i < third; i++) {
            const [cur1, rate1] = col1[i] || ["", ""];
            const [cur2, rate2] = col2[i] || ["", ""];
            const [cur3, rate3] = col3[i] || ["", ""];

            rows += `
                <tr>
                <td>${cur1}</td>
                <td>${rate1?.toFixed(4) || ""}</td>
                <td>${cur2}</td>
                <td>${rate2?.toFixed(4) || ""}</td>
                <td>${cur3}</td>
                <td>${rate3?.toFixed(4) || ""}</td>
                </tr>
            `;
            }

            ratesBody.innerHTML = rows;
            ratesTable.style.display = "table";

        });

        loadCurrencies();
}

function route(){
    document.getElementById("style").href = "home.css";
    document.getElementById("container").innerHTML = `
    <div class="choice_box">
        <h1>Currency Snapshot – Real-Time Rates Across the Globe</h1>
        <button id="1">Currency Converter</button>
        <button id="2">Currency Rate Viewer</button>
    </div>
    `;
    document.getElementById('1').addEventListener('click', route1);
    document.getElementById('2').addEventListener('click', route2);
}

route();