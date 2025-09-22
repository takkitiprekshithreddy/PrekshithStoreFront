import { defineStore } from 'pinia'
import { db, auth } from '@/utility/firebaseConfig'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { computed, ref } from 'vue'
import { ROLE_ADMIN, ROLE_USER } from '@/constants/appConstants'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref(null)
  const error = ref(null)
  const isLoading = ref(false)
  const role = ref(null)
  const initialized = ref(false)
  const isAuthenticated = computed(() => user.value !== null)
  const isAdmin = computed(() => role.value === ROLE_ADMIN)
  const clearUser = () => {
    user.value = null
    role.value = null
  }

  const initializeAuth = async () => {
    console.log('initializeAuth')
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (fireBaseUser) => {
        if (fireBaseUser) {
          user.value = fireBaseUser
          await fetchUserRole(fireBaseUser.uid)
          initialized.value = true
        } else {
          clearUser()
        }
        resolve()
      })
    })
  }

  const fetchUserRole = async (uid) => {
    const userDoc = await getDoc(doc(db, 'users', uid))
    role.value = userDoc.exists() ? userDoc.data().role : ''
  }
  //for SIGNUP
  const signUpUser = async (email, password) => {
    isLoading.value = true
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
      const userRole = email === 'prekshithreddy@gmail.com' ? ROLE_ADMIN : ROLE_USER
      await setDoc(doc(db, 'users', userCredentials.user.uid), {
        email: userCredentials.user.email,
        createdAt: new Date(),
        role: userRole,
      })
      user.value = userCredentials.user
      role.value = userRole
      error.value = null
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  //FOR SIGNIN
  const signInUser = async (email, password) => {
    isLoading.value = true
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredentials.user
      await fetchUserRole(userCredentials.user.uid)
      error.value = null
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  //For SIGNOUT
  const signOutUser = async () => {
    isLoading.value = true
    try {
      const userCredentials = await signOut(auth)
      clearUser()
      error.value = null
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    error,
    isLoading,
    role,
    initialized,
    //getters
    isAuthenticated,
    isAdmin,
    //actions
    signUpUser,
    signInUser,
    signOutUser,
    initializeAuth,
  }
})
