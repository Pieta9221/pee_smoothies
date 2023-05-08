import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'

//components
import SmoothieCard from '../components/SmoothieCard'

const Home = () => {
  const[fetchError, setFetchError] = useState(null)
  const[smoothies, setSmoothies] = useState(null)
  const [orderby, setOrderby] = useState('created_at')

  const handleDelete = (id) =>{
    setSmoothies(prevSmoothies =>{
      return prevSmoothies.filter(sm => sm.id !== id)
    })
  }

  useEffect(() => {
    const fetchSmoothies = async ()=>{
      const{data, error} =  await supabase
      .from('smoothies')
      .select()
      .order(orderby, {ascending: false})

      if(error){
        setFetchError('Could not fetch the smoothies')
        setSmoothies(null)
        console.log(error)
      }
      if(data){
        setSmoothies(data)
        setFetchError(null)
      }
    }
    fetchSmoothies()
  }, [orderby])
  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
      <div className='smoothies'>
        <div  className='order-by'>
          <p>Order by:</p>
          <button onClick={()=> setOrderby('created_at')}>Time Created</button>
          <button onClick={()=> setOrderby('title')}>Title</button>
          <button onClick={()=> setOrderby('rating')}>Rating</button>
          {orderby}
        </div>  
        <div className='smoothie-grid'>
        {smoothies.map(smoothie => (
          <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete}/>
        ))}
        </div>
        </div>
      )}
    </div>
  )
}

export default Home