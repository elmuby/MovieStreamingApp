export const ratingToPercentage = (ratings) =>{
    return (ratings * 10)?.toFixed(0)
}

export const resolveRatingColor = (ratings) =>{
    if(ratings >= 7){
        return "green.400"
    }else if( ratings >= 5){
        return "orange.400"
    }
    else{
        return "red.400"
    }
}
export const minutesToHour =(minutes) =>{
    const hours = Math.floor(minutes/60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}