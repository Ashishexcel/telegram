const express = require('express');
const axios = require('axios');
const bodyparser = require('body-parser');
const dotenv = require('dotenv').config();

const app =express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))

//first I have made a bot with botfather bot build in in telegram
//then from it i get api of my telegram
//then from that id I get details of the the bot like its channel id its messages and its chat id with getUpdates function (method of telegram api)
// after that i got i chat id now i can send message to the chat and after sending message. i again use getUpdates to get the chat idand then after getting
//chat id i fetched all the messages 


const token = process.env.TOKEN;
const telegramapi = `https://api.telegram.org/bot${token}/`; // this is a bot api


const sendmessage = async()=>{
    try {
        let text = 'write anything here'
        let chat_id = '808054918'
        const resd = await axios.get(`${telegramapi}sendMessage?chat_id=${chat_id}&text=${text}`)
        //it is sending data
    } catch (error) {
        console.log(error)
    }
}
// sendmessage(); //this will send message to the bot

//getme know about bot details
const botdetail = async()=>{
    try {
        const resd = await axios.get(`${telegramapi}getMe`)
        console.log(resd)
    } catch (error) {
        console.log(error)
    }
}

var messagefrombot =[]
//get more details of bot


const getmroe =async()=>{
    try {
        const resd = await axios.get(`${telegramapi}getUpdates`)
        const dataarray = resd.data.result;
        console.log(dataarray.length)
        for(let i=0;i<dataarray.length;i++){
            let datafromtext = dataarray[i].message.text;
            messagefrombot.push(datafromtext)
        }
        console.log(messagefrombot)
    } catch (error) {
        console.log(error)
    }
}
// getmroe() // from this we can get the chat id and more details of the user
//this function return the messages of chatbot with me or by the admin who subscribe to that bot

//now let's see how to send message to a public channel by bot


const sendmessagebybottogroup = async()=>{
    try {
        let channelname = `@testchannel`
        let messagetogroup = `hello this message is by bot `
        const resd = await axios.get(`${telegramapi}sendMessage?chat_id=${channelname}&text=${messagetogroup}`)
        console.log('message sent')
        
    } catch (error) {
        console.log(error)
    }
}
// sendmessagebybottogroup(); //from this function message will sent to channel but it need admin to accept bot

