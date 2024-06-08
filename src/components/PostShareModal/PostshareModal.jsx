import { Modal, useMantineTheme } from '@mantine/core'
import PostShare from '../PostShare/PostShare'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../actions/post.actions'
import { appConfig } from '../../config/appConfig'

function PostShareModal({ modalOpened, setModalOpened, postId }) {
  const theme = useMantineTheme()
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopy = async (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(
      `${appConfig.frontEndUrl}/singlePost/${postId}`,
    )
    setCopySuccess(true)
  }

  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="60%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <div className="a-right">
        <form>
          <div
            style={{
              width: '100%',
              justifyContent: 'center',
              display: 'grid',
              alignItems: 'center',
            }}
          >
            <h3>Copy Post Link</h3>
            {copySuccess && (
              <h6 style={{ color: 'green' }}>Linked copied to ClickBoard</h6>
            )}
          </div>
          <div className="main-content">
            <div
              style={{
                width: '96%',
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <input
                type="textArea"
                className="infoInput"
                name="postLink"
                placeholder="postLink"
                value={`${appConfig.frontEndUrl}/singlePost/${postId}`}
                style={{ height: '4rem', width: '96%%' }}
              />
            </div>
          </div>
          <div
            style={{ display: 'flex', width: '100%', justifyContent: 'end' }}
          >
            <button
              className="button infoButton"
              // type="submit"
              style={{ marginTop: '1rem' }}
              onClick={handleCopy}
            >
              Click to Copy
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default PostShareModal
