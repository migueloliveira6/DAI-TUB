export function Ocupacao(x:number){

    let perc = x * 100 /50;

    if(perc < 25){
       return 'fill-green-400 text-green-400'; 
    }else if(perc < 70){
        return 'fill-[#eed202] text-[#eed202]';
    }else{
        return 'fill-red-600 text-red-600';
    }
    
}