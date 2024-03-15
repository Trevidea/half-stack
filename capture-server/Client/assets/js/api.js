<script>
async function callApi()
{
    let result = await fetch('http://localhost:8283/');
    result = await result.json()
    console.warn(result)
    document.getElementById("clientData").innerHTML = result.map((user) => 
        `<tr>
        <td>${user.key}</td>
        <td>${user.field}</td>
        <td>${user.one}</td>
        <td>${user.two}</td>
        </tr>`
    ).join("");
}

callApi();
</script>