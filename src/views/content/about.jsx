import {
  List,
  ListItem,
  ListItemDecorator,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Button,
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
} from '@mui/joy';


const FAQ = () => {
  return (
    <div className="about-part faq">
      <p className="about-Title">
        <span className="about-Title-span highlight">F</span>requently{' '}
        <span className="about-Title-span name">A</span>sked{' '}
        <span className="about-Title-span date">Q</span>uestions - FAQ
      </p>
      <AccordionGroup className="accordion-group" size="md" variant="soft">
        <Accordion className="accordion-item">
          <AccordionSummary className="accordion-summary">
            <span className="first-letter">Q:</span>
            How do I install the app?
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <span className="first-letter">A:</span> You can install the app by
            downloading it from the official app store or directly from our
            website.
          </AccordionDetails>
        </Accordion>
        <Accordion className="accordion-item">
          <AccordionSummary className="accordion-summary">
            <span className="first-letter">Q:</span> Is the app free to use?
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <span className="first-letter">A:</span> Yes, the app is completely
            free to use with optional in-app purchases for advanced features.
          </AccordionDetails>
        </Accordion>
        <Accordion className="accordion-item">
          <AccordionSummary className="accordion-summary">
            <span className="first-letter">Q:</span> How can I get support?
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <span className="first-letter">A:</span> For support, you can reach
            out via the contact form below or send an email to
            support@example.com.
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="about-part contact">
      <p className="contact-title">Contact Us</p>
      <p className="contact-paragraph">
        If you have any questions or feedback, feel free to . contact us!
      </p>
      <form onSubmit={() => {}} className="contact-form">
        <FormControl className="form-group">
          <FormLabel>Name:</FormLabel>
          <Input color="neutral" placeholder="Name" size="lg" variant="soft" />
        </FormControl>
        <FormControl className="form-group">
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            color="neutral"
            placeholder="Email"
            size="lg"
            variant="soft"
          />
        </FormControl>
        <FormControl className="form-group">
          <FormLabel>Message:</FormLabel>
          <Textarea
            minRows={2}
            placeholder="Message"
            size="lg"
            variant="soft"
          />
        </FormControl>
        <Button color="primary" onClick={() => {}} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

const AboutDialog = () => {
  return (
    <div className="about-part about">
      <p className="about-Title">
        <span className="about-Title-span highlight">This app</span> was made by{' '}
        <br />
        <span className="about-Title-span name">Mouad Allaoui</span> in{' '}
        <span className="about-Title-span date">May 2024</span>
      </p>
      <p className="about-paragraph">
        Hi there! I m Mouad Allaoui, a passionate software developer dedicated
        to crafting intuitive and user-friendly applications. This app is the
        result of my commitment to harnessing technology to address real-world
        challenges and make everyday tasks simpler and more efficient. Whether
        you re managing tasks, filtering data, or simply navigating through
        features, my goal is to provide a seamless and enjoyable user
        experience. Thank you for choosing to use my app, and I look forward to
        continuing to innovate and improve it for you!
      </p>
      <p className="about-paragraph">
        <span className="about-paragraph-title">Key Features:</span>
        <List>
          <ListItem>
            <ListItemDecorator>✔</ListItemDecorator> Easy task management
          </ListItem>
          <ListItem>
            <ListItemDecorator>✔</ListItemDecorator> Customizable filters
          </ListItem>
          <ListItem>
            <ListItemDecorator>✔</ListItemDecorator> User-friendly interface
          </ListItem>
        </List>
      </p>
      <p className="about-paragraph">
        <span className="about-paragraph-title">Future Plans:</span>
        <List>
          <ListItem>
            <ListItemDecorator>🔄</ListItemDecorator> Regular updates
          </ListItem>
          <ListItem>
            <ListItemDecorator>🚀</ListItemDecorator> New features based on user
            feedback
          </ListItem>
        </List>
      </p>
    </div>
  );
};

function About() {
  
  return (
    <div className="About-views">
      <AboutDialog />
      <FAQ />
      <Contact />
    </div>
  );
}

export default About;
