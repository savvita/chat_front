import { Col, Row } from "reactstrap";





const About = () => {
    return (
        <div className="text-white"> 
            <Row>
                <Col md="12" lg="6">
                    <p>ChatGPT (Chat Generative Pre-trained Transformer) is an artificial intelligence chatbot developed by OpenAI and launched in November 2022. It is built on top of OpenAI's GPT-3.5 and GPT-4 families of large language models (LLMs) and has been fine-tuned (an approach to transfer learning) using both supervised and reinforcement learning techniques.</p>

                    <p>ChatGPT was launched as a prototype on November 30, 2022, and quickly garnered attention for its detailed responses and articulate answers across many domains of knowledge. Its uneven factual accuracy, however, has been identified as a significant drawback. Following the release of ChatGPT, OpenAI's valuation was estimated at US$29 billion in 2023.</p>

                    <p>ChatGPT was originally released in November 2022 based on GPT-3.5. A version based on GPT-4, the newest OpenAI model, was released on March 14, 2023 and is available for paid subscribers on a limited basis. </p>

                    <cite style={{ fontSize: '0.8rem' }}>From Wikipedia, the free encyclopedia</cite>
                </Col>
                <Col md="12" lg="6" className="text-center">
                    <img src="logo.png" alt="ChatGPT" />       
                </Col>
            </Row>    

        </div>
    );
}

export default About;