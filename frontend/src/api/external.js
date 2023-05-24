import axios from "axios"
const GetBlogs= async ()=>{
    let url="https://newsapi.org/v2/everything?q=bitcoin&apiKey=ed10ddadd40c46cfae39a601eae586c7";
    let response
    try{

        response= await axios.get(url)
        // console.log("aaaa",response.data.articles.slice(0,5))
    }
    catch(err){
        // console.log("ahahahah")
        console.log(err)
    }
    return response.data.articles.slice(0,20);

}  

const GetCrypto= async ()=>{
    let url="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
    let response
    try{
        response= await axios.get(url)

        // console.log("aaaa",response)
    }   
    catch(err){
    
        console.log("A",err)
    }
    return response.data.slice(0,20);
}
export {GetBlogs,GetCrypto};
// export default GetBlogs;