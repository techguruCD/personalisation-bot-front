import axios from 'axios'
import store from '../store'
import { setHomeSetting, setLoading } from '../store/appSlice'
import showToaster from './showToaster'

export default async function updateHomeSetting (key, ref, setEdit) {
    store.dispatch(setLoading(true))
    try {
      const {data: response} = await axios.post(process.env.REACT_APP_API_URL + '/api/admin/update-homeSetting', {
        key, value: ref.current.innerHTML
      })
      setEdit(false)
      store.dispatch(setHomeSetting({[key]: ref.current.innerHTML}))
      showToaster(response?.message)
    } catch (err) {
      showToaster(err?.response?.data?.message || {error: 'Please try again later'})
    }
    store.dispatch(setLoading(false))
}