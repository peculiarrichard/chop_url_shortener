'use client'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Nav from '@/components/Nav'
import Stats from '@/components/Stats'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Nav></Nav>
      <Hero></Hero>
      <Stats></Stats>
      <Footer></Footer>
    </>
  )
}
