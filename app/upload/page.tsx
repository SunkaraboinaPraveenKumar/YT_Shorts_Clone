"use client"
import { uploadShortAction } from '@/actions/upload-short'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Upload from '@/components/upload'
import { Loader2 } from 'lucide-react'
import React, { useActionState, useState } from 'react'

const UploadPage = () => {
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [formState, action, isPending] = useActionState(uploadShortAction, { errors: {} })
    const handleSubmit = async (formData: FormData) => {
        formData.append("video", videoUrl);
        return action(formData);
    }
    return (
        <div className='max-w-md mx-auto p-6'>
            <h1 className='mb-6 text-2xl font-bold text-center'>Upload Shorts</h1>
            <form action={handleSubmit}>
                <div className='mb-4'>
                    <Label>Title</Label>
                    <Input
                        type='text'
                        name='title'
                        placeholder='Title'
                        className='mt-1'
                        required
                    />
                    {formState.errors.title && (
                        <span className='text-red-500 text-sm'>{formState.errors.title.join(', ')}</span>
                    )}
                </div>
                <div className='mb-4'>
                    <Label>Description</Label>
                    <Input
                        type='text'
                        name='description'
                        placeholder='Description'
                        className='mt-1'
                        required
                    />
                    {formState.errors.description && (
                        <span className='text-red-500 text-sm'>{formState.errors.description.join(', ')}</span>
                    )}
                </div>
                <div className='mb-4'>
                    <Upload setVideoUrl={setVideoUrl}/>
                    {formState.errors.video && (
                        <span className='text-red-500 text-sm'>{formState.errors.video.join(', ')}</span>
                    )}
                </div>
                {formState.errors.formError && (
                    <div className='mb-4 text-red-500 text-sm'>{formState.errors.formError.join(', ')}</div>
                )}
                <Button type="submit" className='w-full cursor-pointer' disabled={isPending}>
                    {isPending ? <Loader2 className='animate-spin h-4 w-4'/> : 'Upload'}
                </Button>
            </form>
        </div>
    )
}

export default UploadPage