import author from '../../images/author.jpg';

function Author() {
  return (
    <>
      <div className="root__section author__container">
        <img className='author__img' src={author} alt="автор" />
        <div className='author__aboutContainer'>
          <p className='author__title'>Stanislav</p>
          <p className='author__title'>Ponomarev</p>
          <p style={{fontSize: '22px', color: '#059bb3'}}>Frontend(React) developer</p>
          <a href="https://github.com/StanislavPonomarev93" target='_blank' rel="noreferrer">My profile gitHub</a>
        </div>
      </div>
    </>
  )
}
export default Author;