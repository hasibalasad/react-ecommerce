import styled from "styled-components";

const Contact = () => {
    const Wrapper = styled.section`
        padding: 9rem 0 5rem 0;
        text-align: center;

        .container {
        margin-top: 6rem;

        .contact-form {
            max-width: 50rem;
            margin: auto;

            .contact-inputs {
            display: flex;
            flex-direction: column;
            gap: 3rem;

            input[type="submit"] {
                cursor: pointer;
                transition: all 0.2s;

                &:hover {
                background-color: ${({ theme }) => theme.colors.white};
                border: 1px solid ${({ theme }) => theme.colors.btn};
                color: ${({ theme }) => theme.colors.btn};
                transform: scale(0.9);
                }
            }
            }
        }
        }
  `;

    return (
        <Wrapper>
            <h2 className="common-heading">Contact page</h2>

            <iframe
                title="Google map link"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8596309816317!2d90.37469027597231!3d23.75238448869899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8ad9fa517b1%3A0x35432872356d26a0!2sMetro%20Shopping%20Mall!5e0!3m2!1sen!2sbd!4v1692223637021!5m2!1sen!2sbd"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>

            <div className="container">
                <div className="contact-form">
                    <form
                        action="https://formspree.io/f/mjvqyddd"
                        method="POST"
                        className="contact-inputs">
                        <input
                            type="text"
                            placeholder="username"
                            name="username"
                            required
                            autoComplete="off"
                        />

                        <input
                            type="email"
                            name="Email"
                            placeholder="Email"
                            autoComplete="off"
                            required
                        />

                        <textarea
                            name="Message"
                            cols="30"
                            rows="10"
                            required
                            autoComplete="off"
                            placeholder="Enter you message"></textarea>

                        <input type="submit" value="send" />
                    </form>
                </div>
            </div>
        </Wrapper>
    );
};

export default Contact;
