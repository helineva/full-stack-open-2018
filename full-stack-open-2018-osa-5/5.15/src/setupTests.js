import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
jest.mock('./services/blogs')

configure({ adapter: new Adapter() })

let savedItems = { test: 'test' }

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  removeItem: (key) => { delete savedItems[key] }
}

window.localStorage = localStorageMock
