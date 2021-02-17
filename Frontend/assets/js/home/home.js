$('#ajax').on('click', () => {
    $.ajax({
        url: 'http://localhost:8080/home',
        method: 'get',
        headers: { "x-auth-token": localStorage.getItem('x-auth-token') },
        success: function(response) {
            console.log(response._id)
        },

    })
})