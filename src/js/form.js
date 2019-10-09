export default function initForm() {
    const forms = document.forms;
    if(!forms.length) return;

    for (const form of forms) {

        // form.onsubmit = function(ev) {
        //     ev.preventDefault();
        //
        //     const xhr = new XMLHttpRequest();
        //     let data = new FormData(this);
        //
        //     data.append("middle", "Иванович");
        //
        //     xhr.open('post', this.action);
        //
        //     xhr.onload = function() {
        //         if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
        //             console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
        //         } else { // если всё прошло гладко, выводим результат
        //             console.log(JSON.parse(xhr.response)); // response -- это ответ сервера
        //         }
        //     };
        //
        //     xhr.onprogress = function(event) {
        //         if (event.lengthComputable) {
        //             console.log(`Получено ${event.loaded} из ${event.total} байт`);
        //         } else {
        //             console.log(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
        //         }
        //
        //     };
        //
        //     xhr.onerror = function(er) {
        //         console.log('err ', er)
        //     };
        //     xhr.send(data);
        //
        // };
        form.onsubmit = async function (ev) {
            ev.preventDefault();
            console.log(ev);
            console.log(ev.target);
            let data = await new FormData(this);

            let products = [
                {
                    product: "h",
                    count: 2
                },
                {
                    product: "h222",
                    count: 1
                },
                {
                    product: "f2",
                    count: 3
                }
            ];

            products.forEach((product, i) => {
                data.append('product['+i+']', product.product);
                data.append('product['+i+']', product.count);
            });

            try {
                let response = await fetch(this.action, {
                    method: this.method,
                    mode: "no-cors",
                    cache: 'no-cache',
                    credentials: 'omit',
                    body:  data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                let result = await response.json();
                console.log(result);

            } catch (e) {
                console.log(e)
            }


        };
    }

    console.log(forms);
}