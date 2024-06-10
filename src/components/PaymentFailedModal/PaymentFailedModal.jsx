import { Modal, useMantineTheme } from '@mantine/core'
import PostShare from '../PostShare/PostShare'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../actions/post.actions'
import { appConfig } from '../../config/appConfig'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'

function PaymentFailModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme()
  const navigate = useNavigate()

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
      onClose={() => {
        setModalOpened(false)
        navigate(path.home)
      }}
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
            <h3 style={{ color: 'red' }}>Payment Failed</h3>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default PaymentFailModal
