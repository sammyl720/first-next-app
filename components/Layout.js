import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  borer: '1px solid #ddd'
}
const Layout = props => {
  return (
    <div style={layoutStyle}>
      <Header />
      {props.children}
    </div>
  )
}

export default Layout
