import styled, { keyframes } from 'styled-components';
import 'react-clock/dist/Clock.css';
import "../App.css"
import React, { useState, useRef, useEffect } from 'react'
import {
  useDisclosure,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import axios from 'axios'
import date from 'date-and-time';
import { LinkOutlined, RightCircleOutlined } from '@ant-design/icons';
import instaLogo from '../assets/instagram.png';
// import { emotions } from '../constants/constants'


const Animation = keyframes`
  0% { box-shadow: 0 0 10px #09EE9A; }
  30% { box-shadow: 0 0 30px rgba(222, 59, 208, 1);  }
  50% { box-shadow: 0 0 20px #09DEEE;  }
  70% { box-shadow: 0 0 30px rgba(102, 37, 177, 1);  }
  100% { box-shadow: 0 0 30px rgba(102, 37, 177, 1);  }
`


const Grid2Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;
  z-index:100;
  position: relative;
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  backdrop-filter: blur(3px);
  box-shadow: 0 0 30px rgba(199, 239, 255, 0.74);
  // border: 1px solid white;
  margin-bottom: 15px;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 50vh;
  }
`

const DateTimeContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
  gap: 25px;


  @media (max-width: 768px) {
    margin-top: 5px;
gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`


const TimeContainer = styled.div`
    color: white;
    font-weight: normal;
    font-family: sans-serif;
    display: flex;
    color: white;
    grid-gap: 10px;
    z-index:2;
    align-items: flex-end;

    h1 {
      color: white;
      font-size: 25px;
      color: white;
      font-weight: 200;
    }
`

const DateContainer = styled.div`
    display: flex;
    font-family: sans-serif;
    align-items: center;
    z-index:2;
    grid-gap: 10px;
    color: white;
    font-size: 25px;
    font-weight: bold;

    h1 {
      font-size: 25px;
      font-weight: 200;
      color: white;
    }
`

const DropdownContainer = styled.div`
  margin-bottom: 10px;
`

const InputContainer = styled.div`
  color: black;
  input {
    font-size: 25px;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    backdrop-filter: blur(10px);
    background-color: none;
  }
`


const MessageContainer = styled.div`
  input {
    padding-top: 10px;
    padding-bottom: 60px;
  }
`

const FormButtonContainer = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
`

const InstaContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `

const InstaIMGContainer = styled.div`
    display: flex;
    justify-content: center;

    img {
      object-fit: cover;
      height: 20vh;
      border-radius: 10px;
    }
  `

const InstaButtonContainer = styled.div`
    width: 100%;
    justify-content: center;
    display: flex;
    margin-top: 20px;
  `

const InstaButton = styled.button`
    width: 100%;
    text-decoration: none;
    display: flex;
    Justify-content: center;

    h1 {
      font-family: sans-serif;
      font-size: 15px;
      color: white;
      padding: 10px;
      text-decoration: none;
      margin-left: 10px;
    }

    h1:hover {
      border-radius: 10px;
      background-color: rgba(0, 123, 255, 0.5);
    }
  `
function LiveClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
      {formattedTime}
    </div>
  )
}

const StyledClock = styled(LiveClock)`
  color: white;
  font-size: 24px;
  font-weight: bold;
  font-family: sans; 
`


export default function ContactForm() {
  const form = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [message, setMessage] = useState(null)
  const [mood, setMood] = useState(null)
  const [email, setEmail] = useState(null)
  const [name, setName] = useState(null)
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  const sendData = async () => {
    const formattedName = encodeURIComponent(name)
    const formattedMood = encodeURIComponent(mood)
    const formattedEmail = encodeURIComponent(email)
    const formattedMessage = encodeURIComponent(message)


    const URL = `name=${formattedName}&mood=${formattedMood}&email=${formattedEmail}&message=${formattedMessage}`;
    const results = await axios.post("/.netlify/functions/sendData/?" + URL);
    console.log(results);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendData()
  }

  // console.log(`mood: `, mood);
  // console.log(`Email: `, email);
  // console.log(`Name: `, name);
  // console.log(`Message: `, message);


  const now = new Date();
  date.format(now, 'MMM DD YYYY');



  return (
    <>
      <Grid2Container>
        <InnerContainer>
          <form ref={form} id="myForm" onSubmit={handleSubmit}>

            <FormControl pb={6}>
              <FormLabel
                css={{
                  fontSize: "40px",
                  textAlign: "center",
                  marginTop: "5px",
                  color: 'white',
                  marginBottom: "15px"
                }}
              >Contact Me</FormLabel>

              <DateTimeContainer>
                <TimeContainer>
                  <h1>Time: </h1>
                  <StyledClock />
                </TimeContainer>
                <DateContainer>
                  <h1>Date: </h1> {date.format(now, 'ddd, MMM DD YYYY')}
                </DateContainer>
              </DateTimeContainer>

              <InstaContainer>
                <InstaIMGContainer>
                  <img src={instaLogo} />
                </InstaIMGContainer>

                <InstaButtonContainer>
                  <InstaButton as="a" href="https://www.instagram.com/studiomaxamilian?utm_source=qr&igsh=bGRrbmh5dzQ4bjhk" target="_blank" rel="noopener noreferrer">
                    <RightCircleOutlined />
                    <h1>Navigate To Instagram</h1>
                  </InstaButton>
                </InstaButtonContainer>
              </InstaContainer>

              {/* <InputContainer> */}
              {/*   <DropdownContainer> */}
              {/*     <Select */}
              {/*       placeholder="Select Mood" */}
              {/*       css={{ width: "100%", padding: "10px", cursor: "pointer" }} */}
              {/*       onChangeCapture={(event) => setMood(event.target.value)} */}
              {/*     > */}
              {/*       {emotions.map(({ id, title }) => ( */}
              {/*         <option */}
              {/*           key={id} */}
              {/*           id="mood" */}
              {/*           value={title} */}
              {/*           type="text" */}
              {/*         > */}
              {/*           {title} */}
              {/*         </option> */}
              {/*       ))} */}
              {/*     </Select> */}
              {/*   </DropdownContainer> */}
              {/*   <input */}
              {/*     id="name" */}
              {/*     type="text" */}
              {/*     name="user_name" */}
              {/*     placeholder="Name" */}
              {/*     onChange={(e) => setName(e.target.value)} */}
              {/*   /> */}
              {/*   <input */}
              {/*     id="email" */}
              {/*     type="email" */}
              {/*     name="user_email" */}
              {/*     placeholder="E-Mail" */}
              {/*     onChange={(e) => setEmail(e.target.value)} */}
              {/*   /> */}
              {/*   <MessageContainer> */}
              {/*     <input */}
              {/*       type="text" */}
              {/*       id="message" */}
              {/*       placeholder="Message" */}
              {/*       name="user_message" */}
              {/*       onChange={(e) => setMessage(e.target.value)} */}
              {/*     /> */}
              {/*   </MessageContainer> */}
              {/* </InputContainer> */}
              {/**/}
              {/* <FormButtonContainer> */}
              {/*   <Button */}
              {/*     className="modalButton" */}
              {/*     id="btn" */}
              {/*     value="send" */}
              {/*     type="submit" */}
              {/*   > */}
              {/*     Send */}
              {/*   </Button> */}
              {/* </FormButtonContainer> */}
            </FormControl>
          </form>
        </InnerContainer>
      </Grid2Container>
    </>
  )
}

