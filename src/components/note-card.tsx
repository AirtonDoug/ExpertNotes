import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'
interface NoteCardProps {
  note: {
    date: Date
    content: string
    id: string
  }
  onNoteDeleted: (id:string) => void
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex-col  bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-line-400">
        <span className="text-sm font-medium">
        {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})}
        </span>
        <p className="text-sm leading-6 text-slate-400">
          {note.content}
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to to-black/0 pointer-events-none">
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50' />

        <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none'> {/*stranslate para deixar o modal no meio da tela*/}
          <div className='flex flex-1 flex-col gap-3 p-5'>
          <span className="text-sm font-medium">
          {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})}
        </span>
        <p className="text-sm leading-6 text-slate-400">
          {note.content}
        </p>
          </div>
          <button 
          type='button'
          onClick={()=>onNoteDeleted(note.id)}
          className='w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group' 
          >{/* group faz com que a classe pai aplique determinados estilos somente nas classes filhas */}
            Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota?</span>
          </button>
          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 text-slate-400'>
              <X className='size-5 hover:text-slate-100'/>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}