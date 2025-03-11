document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".question-title");

    questions.forEach((question) => {
        question.addEventListener("click", function () {
           
            const parentItem = this.parentElement;
            
            
            document.querySelectorAll(".question-list-item").forEach((item) => {
                if (item !== parentItem) {
                    item.classList.remove("active");
                }
            });

            
            parentItem.classList.toggle("active");
        });
    });
});