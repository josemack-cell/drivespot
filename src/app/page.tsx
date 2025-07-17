'use client'

import { useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd'

type Widget = {
  id: string
  title: string
  content: React.ReactNode
}

export default function Dashboard() {
  // 1) Define your initial widgets
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: 'sales',
      title: 'WooCommerce Status',
      content: (
        <>
          <div className="text-lg font-bold">KSh1,800.00</div>
          <div className="text-sm text-gray-600">net sales this month</div>
        </>
      ),
    },
    {
      id: 'activity',
      title: 'Activity',
      content: <div className="text-gray-600">No activity yet!</div>,
    },
    {
      id: 'glance',
      title: 'At a Glance',
      content: (
        <>
          <div>📝 15 Pages</div>
          <div className="text-xs text-gray-500">
            WordPress 6.7.2 running Autozpro Child theme.
          </div>
        </>
      ),
    },
    {
      id: 'draft',
      title: 'Quick Draft',
      content: (
        <>
          <input
            className="w-full border px-2 py-1 rounded mb-2"
            placeholder="Title"
          />
          <textarea
            className="w-full border px-2 py-1 rounded mb-2"
            rows={3}
            placeholder="What's on your mind?"
          />
          <button className="bg-blue-600 text-white px-3 py-1 rounded">
            Save Draft
          </button>
        </>
      ),
    },
  ])

  // 2) Handle reorder logic
  function handleDragEnd(result: DropResult) {
    if (!result.destination) return
    const updated = Array.from(widgets)
    const [moved] = updated.splice(result.source.index, 1)
    updated.splice(result.destination.index, 0, moved)
    setWidgets(updated)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard" direction="vertical">
          {(provided) => (
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {widgets.map((widget, index) => (
                <Draggable
                  key={widget.id}
                  draggableId={widget.id}
                  index={index}
                >
                  {(prov, snapshot) => (
                    <section
                      ref={prov.innerRef}
                      {...prov.draggableProps}
                      {...prov.dragHandleProps}
                      className={`
                        bg-white rounded shadow-sm
                        ${snapshot.isDragging ? 'ring-2 ring-blue-400' : ''}
                      `}
                    >
                      <header className="px-4 py-2 bg-gray-100 border-b cursor-move">
                        <h2 className="font-medium">{widget.title}</h2>
                      </header>
                      <div className="p-4">{widget.content}</div>
                    </section>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
