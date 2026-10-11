function progress(totalTasks, completedTasks){

    if (typeof totalTasks !== "number" || typeof completedTasks !== "number") {
    console.log("Ошибка: аргументы должны быть числами");
    return;
    }
    
    if (!Number.isInteger(totalTasks) || !Number.isInteger(completedTasks)) {
    console.log("Ошибка: аргументы должны быть целыми числами");
    return;
    }

    
    if(totalTasks < 0 || totalTasks > 1000){
        console.log("Ошибка: Число должно быть от 0 до 1000");
        return;
    }
    if (completedTasks < 0 || completedTasks > totalTasks){
        console.log("Ошибка: completedTasks не может превышать totalTasks");
        return;
    }

    if (totalTasks === 0 && completedTasks === 0){
        console.log("Задач пока нет");
        return;
    }
    
    const remaining = totalTasks - completedTasks;
    const percent = (completedTasks / totalTasks * 100).toFixed(1);

    let status;

    if(completedTasks === 0){
        status = "Не начато";
    }
    else if (completedTasks === totalTasks){
        status = "Завершено";
    }
    else{
        status = "В работе";
    }

    console.log(`Остаток - ${remaining}, Прогресс - ${percent}%, Статус - ${status}`);
}


progress(12, 5);
progress(0, 0);
progress(5, 6);