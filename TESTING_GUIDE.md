# Testing Instructions for Backend → Frontend Image Display

## Step 1: Start Backend Server
```bash
cd backend
npm run dev
```

**Expected Output:**
- "Server running on port 5000"
- "MongoDB Connected"

## Step 2: Test Database Connection
```bash
node test-api.js
```

**Expected Output:**
- "✓ MongoDB Connected"
- List of projects (if any exist)
- If no projects: "⚠️  No projects found in database!"

## Step 3: Start Frontend Dev Server
```bash
cd ..
npm run dev
```

**Expected Output:**
- "Local: http://localhost:5173"

## Step 4: Open Browser Console
1. Open http://localhost:5173 in browser
2. Press F12 to open Developer Tools
3. Go to "Console" tab

**Look for these logs:**
- "🔄 Fetching projects from: http://localhost:5000/api"
- "✅ Projects fetched: X projects"
- "✅ SHOWING backend projects: X" OR "⚠️ No backend projects found"

## Step 5: Upload a Test Project
1. Navigate to: http://localhost:5173/admin
2. Login (if required)
3. Go to "Projects" section
4. Click "Add Project"
5. Fill in:
   - Title: "Test Project"
   - Description: "Test"
   - Tags: "Web Design"
   - Upload an image
   - ✅ Check "Featured Project" (IMPORTANT!)
6. Click "Save"

## Step 6: Verify on Landing Page
1. Go back to: http://localhost:5173
2. Scroll to "Selected Work" section
3. **YOU SHOULD SEE:** Your uploaded project with image

## Debugging if Image Doesn't Show

### Check Backend API
Open in browser: http://localhost:5000/api/projects

**Should return JSON like:**
```json
[
  {
    "_id": "...",
    "title": "Test Project",
    "imageUrl": "uploads/image-1234567.jpg",
    "featured": true
  }
]
```

### Check Image URL
Open in browser: http://localhost:5000/uploads/image-1234567.jpg
(Use the actual filename from the API response)

**Should display the image directly**

### Check Console Logs
In browser console, you should see:
```
🔄 Fetching projects from: http://localhost:5000/api
✅ Projects fetched: 1 projects
✅ SHOWING FEATURED backend projects: 1
Project 1: Test Project | Image: http://localhost:5000/uploads/image-...jpg
```

## Common Issues

### Issue: "No backend projects found"
**Solution:** 
- Ensure backend is running
- Check MongoDB connection
- Verify projects exist: `node test-api.js`

### Issue: Image shows as broken
**Solution:**
- Check uploads folder exists: `backend/uploads/`
- Verify image file is in uploads folder
- Test direct access: http://localhost:5000/uploads/[filename]

### Issue: Static projects still showing
**Solution:**
- Hard refresh browser (Ctrl + Shift + R)
- Check featured checkbox is checked
- Verify console shows "SHOWING backend projects"
