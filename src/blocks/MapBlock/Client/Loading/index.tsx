export function Loading({ isLoading, isError }: { isLoading: boolean; isError: boolean }) {
  return (
    <>
      {(isLoading || isError) && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            pointerEvents: 'none',
            zIndex: 1000,
            textAlign: 'center',
          }}
        >
          {isLoading ? 'Fák betöltése...' : 'Fák betöltése sikertelen'}
        </div>
      )}
    </>
  )
}
