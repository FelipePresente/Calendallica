import { useState, useEffect } from "react"

export default function useServerWakeUp(api_url: string) {
    const [isServerAwake, setIsServerAwake] = useState(() =>
        sessionStorage.getItem('server_awake') === 'true'
      )
    
      useEffect(() => {
        if (isServerAwake) return
    
        const ping = async () => {
          try {
            const response = await fetch(`${api_url}/status/ping`)
    
            if (response.ok) {
              setIsServerAwake(true)
    
              sessionStorage.setItem('server_awake', 'true')
            } else {
              setTimeout(ping, 5000)
            }
          } catch (error) {
            setTimeout(ping, 3000)
          }
        }
        ping()
      }, [api_url, isServerAwake])

      return isServerAwake
}