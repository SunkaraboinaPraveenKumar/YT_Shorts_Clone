"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Plus, Menu, X } from 'lucide-react'
import { ModeToggle } from '../mode-toggle'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="w-full px-4 py-3">
                {/* Top Row - Always visible */}
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href={"/"} className="font-bold text-xl">
                        YT <span className="text-red-500">Shorts</span>
                    </Link>

                    {/* Desktop Navigation - Hidden on mobile */}
                    <div className="hidden md:flex md:w-1/2 md:mx-4">
                        <Input placeholder="Search..." type="text" className="w-full" />
                    </div>

                    {/* Desktop Controls - Hidden on mobile */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href={"/upload"}>
                            <Button className="cursor-pointer">
                                <Plus className="mr-1" /> Create
                            </Button>
                        </Link>

                        <div className="flex items-center">
                            <SignedOut>
                                <SignInButton>
                                    <Button className="cursor-pointer">Sign In</Button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>
                        </div>

                        <ModeToggle />
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} className='cursor-pointer' /> : <Menu size={24} className='cursor-pointer' />}
                    </button>
                </div>

                {/* Mobile Search - Only visible on mobile and directly below top row */}
                <div className="md:hidden mt-3">
                    <Input placeholder="Search..." type="text" className="w-full" />
                </div>

                {/* Mobile Menu - Conditionally rendered based on state */}
                {isMenuOpen && (
                    <div className="md:hidden mt-3 flex flex-col gap-3 pb-3 animate-in slide-in-from-top duration-300">
                        <Link href={"/upload"}>
                            <Button className="w-full cursor-pointer">
                                <Plus className="mr-1" /> Create
                            </Button>
                        </Link>

                        <div className="flex justify-between items-center">
                            <SignedOut>
                                <SignInButton>
                                    <Button className="w-full cursor-pointer">Sign In</Button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>
                            <ModeToggle />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar