const NotFound = () => {
  function goBack () {
    window.history.back()
  }

  return (
    <>
      <div class="w-1/2 m-auto flex flex-col items-center">
        <h1 class="font-bold text-24 text-center">Page not found</h1>

        <button
          class="w-3/4 mt-4 py-3 text-center font-bold text-xl bg-black text-white rounded hover:bg-gray-900"
          onclick="goBack()"
        >
          Go back
        </button>
      </div>

      <script>
        { goBack }
      </script>
    </>
  )
}

export { NotFound }