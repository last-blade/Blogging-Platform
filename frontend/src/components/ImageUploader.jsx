"use client"

import { useState } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs"
import { Upload } from "lucide-react"

export function ImageUploader({ onInsert, onCancel }) {
  const [imageUrl, setImageUrl] = useState("")
  const [uploadedImage, setUploadedImage] = useState(null)
  const [activeTab, setActiveTab] = useState("upload")

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInsert = () => {
    if (activeTab === "upload" && uploadedImage) {
      onInsert(uploadedImage)
    } else if (activeTab === "url" && imageUrl) {
      onInsert(imageUrl)
    }
  }

  return (
    <div className="space-y-4 py-2">
      <Tabs defaultValue="upload" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="url">URL</TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-upload">Upload Image</Label>
            <div
              className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors ${uploadedImage ? "border-primary" : ""}`}
              onClick={() => document.getElementById("image-upload").click()}
            >
              {uploadedImage ? (
                <div className="space-y-2">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Preview"
                    className="max-h-[200px] mx-auto rounded-md"
                  />
                  <p className="text-sm text-muted-foreground">Click to change image</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="font-medium">Click to upload</p>
                  <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 2MB)</p>
                </div>
              )}
              <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="url" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-url">Image URL</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="image-url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            {imageUrl && (
              <div className="mt-2 rounded-md border p-2">
                <p className="text-sm font-medium mb-1">Preview:</p>
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-[150px] rounded-md"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E"
                    e.target.style.padding = "2rem"
                    e.target.style.backgroundColor = "#f1f5f9"
                  }}
                />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleInsert}
          disabled={(activeTab === "upload" && !uploadedImage) || (activeTab === "url" && !imageUrl)}
        >
          Insert
        </Button>
      </div>
    </div>
  )
}

