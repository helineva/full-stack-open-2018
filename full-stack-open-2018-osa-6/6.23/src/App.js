import knuthImage from './KnuthAtOpenContentAlliance.jpg'
import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Form, Button, Header, Segment, List, Message } from 'semantic-ui-react'

const Menu = () => {
  const style = {
    backgroundColor: 'lightGrey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  }
  const activeStyle = {
    fontWeight: 'bold'
  }
  return (
    <div style={style}>
      <NavLink exact to="/" activeStyle={activeStyle}>anecdotes</NavLink>&emsp;
      <NavLink to='/create' activeStyle={activeStyle}>create new</NavLink>&emsp;
      <NavLink to='/about' activeStyle={activeStyle}>about</NavLink>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <Header as='h2'>Anecdotes</Header>
    <Table>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>
                {anecdote.content}
              </Link>
            </Table.Cell>
          </Table.Row>)
        }
      </Table.Body>
    </Table>
  </div>
)

const About = () => (
  <div>
    <Header as='h2'>About anecdote app</Header>
    <Grid divided='vertically'>
      <Grid.Row columns={2}>
        <Grid.Column width={7}>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Grid.Column>
        <Grid.Column width={3}>
          <div style={{ fontSize: 10 }}>
            <img src={knuthImage}
              alt='Donald Knuth at Open Content Alliance'
              width='200'
               />
               Donald Knuth (pic by Jacob Appelbaum)
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

const Footer = () => {
  const style = {
    marginTop: 40
  }
  return (
    <div style={style}>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

      See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
    </div>
  )
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })

    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <Header as='h2'>create a new anecdote</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>content</label>
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>url for more info</label>
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field>
          <Button>create</Button>
        </Form>
      </div>
    )

  }
}

const AnecdoteView = ({ anecdote }) => {
  const style = {
    fontWeight: 'bold',
    fontSize: 20
  }
  return (
    <div>
      <Segment style={style}>{anecdote.content}</Segment>
      <List bulleted>
        <List.Item>has {anecdote.votes} votes</List.Item>
        <List.Item>for more info see <a href={anecdote.info}>{anecdote.info}</a></List.Item>
      </List>
    </div>
  )
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    const notification = `a new anecdote ${anecdote.content} created!`
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote), notification
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <div>
          <Router>
            <div>
              <Header as='h1'>Software anecdotes</Header>
                <Menu />
                {this.state.notification &&
                  <Message>{this.state.notification}</Message>
                }
                <Route exact path='/' render={() =>
                  <AnecdoteList anecdotes={this.state.anecdotes} />} />
                <Route path='/about' render={() => <About />} />
                <Route path='/create' render={({ history }) =>
                  <CreateNew addNew={this.addNew} history={history}/>} />
                <Route exact path='/anecdotes/:id' render={({ match }) =>
                  <AnecdoteView anecdote={this.anecdoteById(match.params.id)} />} />
              <Footer />
            </div>
          </Router>
        </div>
      </Container>
    );
  }
}

export default App;
