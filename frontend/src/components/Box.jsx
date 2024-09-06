import '../pages/dashboard/dashboard.styles.css';

const Box = ({prop, width='100%', height='200px', data}) => {
 
  return (
    <div
        style={{
            background:`linear-gradient(to right, ${prop[0]} 30%, ${prop[1]})`,
            width:width,
            height:height,
            borderRadius:'10px',
            boxShadow:'-2px 2px 6px 3px #e0e0eb'
        }}
        className='box p-4'

    >
      <h2 className='text-white  text-center'>{data}</h2>
    </div>
  )
}

export default Box