import '../pages/dashboard/dashboard.styles.css';

const Box2 = ({prop}) => {
  return (
    <div
    style={{
        background:`linear-gradient(to right, ${prop[0]} 30%, ${prop[1]})`,
        width:'100%',
        height:'100%',
        borderRadius:'10px',
        boxShadow:'-2px 2px 6px 3px #e0e0eb'
    }}
    className='box2'
    ></div>
  )
}

export default Box2